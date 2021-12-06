const MarkdownIt = require("markdown-it");
const MarkdownItContainer = require("markdown-it-container");
const VueTemplateComplier = require("vue-template-compiler");
const hljs = require("highlight.js");
const hash = require("hash-sum");
const { parse, compileTemplate } = require("@vue/component-compiler-utils");

module.exports = function(source) {
  // 需要解析成vue代码块集合
  const componentCodeList = [];
  let styleCodeList = [];
  const delimiterCodeList = [];
  const globalScript = [];
  // 初始化MarkdownIt用于转换md文件为html
  const markdownIt = MarkdownIt({
    html: true,
    xhtmlOut: true,
    // 将markdown中的代码块用hljs高亮显示
    highlight: function(code, language) {
      let codeHtml;
      if (language && hljs.getLanguage(language)) {
        codeHtml = hljs.highlight(code, { language, ignoreIllegals: true })
          .value;
      } else {
        codeHtml = markdownIt.utils.escapeHtml(code);
      }
      // 替换vue的变量分隔符 {{  }} 阻止二次变量编译错误
      const delimiterRegex = /\{\{.*?\}\}/g;
      codeHtml = codeHtml.replace(delimiterRegex, value => {
        const code = `data_${hash(value)}`;
        delimiterCodeList.push(`${code}:"${value}"`);
        return `{{${code}}}`;
      });
      return `<pre class="hljs"><code>${codeHtml}</code></pre>`;
    }
  });
  // 解析【:::tip:::】
  markdownIt.use(MarkdownItContainer, "tip");
  // 解析【:::warning:::】
  markdownIt.use(MarkdownItContainer, "warning");
  // 使用【markdown-it-container】插件解析【:::snippet :::】代码块为vue渲染
  markdownIt.use(MarkdownItContainer, "snippet", {
    // 验证代码块为【:::snippet :::】才进行渲染
    validate(params) {
      return params.trim().match(/^snippet\s*(.*)$/);
    },
    // 代码块渲染
    render(tokens, index) {
      const token = tokens[index];
      const tokenInfo = token.info.trim().match(/^snippet\s*(.*)$/);
      if (token.nesting === 1) {
        // 获取snippet第一行的表述内容
        const desc = tokenInfo && tokenInfo.length > 1 ? tokenInfo[1] : "";
        // 获取vue组件示例的代码
        const nextIndex = tokens[index + 1];
        let content = nextIndex.type === "fence" ? nextIndex.content : "";
        // 将content解析为vue组件基本属性对象;
        let { template, script, styles } = parse({
          source: content,
          compiler: VueTemplateComplier,
          needMap: false
        });
        styleCodeList = styleCodeList.concat(styles);
        // 将template的转为render函数
        let templateCodeRender = "";
        if (template && template.content) {
          const { code } = compileTemplate({
            source: template.content,
            compiler: VueTemplateComplier
          });
          templateCodeRender = code;
        }

        // 获取script的代码
        script = script ? script.content : "";
        if (script) {
          const [global, content] = script.split(/export\s+default/);
          globalScript.push(global.trim());
          script = `const exportJavaScript = ${content}`;
        } else {
          script = "const exportJavaScript = {};";
        }
        // 代码块解析将需要解析vue组件的存储，渲染html用组件名称替代
        const name = `vc-snippent-${componentCodeList.length}`;
        // 渲染组件代码添加到数据集合
        componentCodeList.push(`"${name}":(function () {
          ${templateCodeRender}
          ${script}
           return {
             ...exportJavaScript,
            ${templateCodeRender ? "render," : ""} 
            ${templateCodeRender ? "staticRenderFns," : ""}   
          }
        })()`);
        // 将需要渲染的示例用vc-snippet组件包裹替换插槽显示示例效果
        return `<vc-snippet>
                  <div slot="desc">${markdownIt.render(desc)}</div>
                  <${name} slot="source" />
                  <div slot="code">`;
      }
      return `    </div>
                </vc-snippet> `;
    }
  });
  // 将所有转换好的代码字符串拼接成vue单组件template、script、style格式
  return `
        <template>
          <div class="vc-snippet-doc">
            ${markdownIt.render(source)}
          </div>
        </template>
        <script>
           ${globalScript.join(" ")}
           export default {
           name: 'vc-component-doc',
           components: {
            ${componentCodeList.join(",")}
           },
           data(){
            return {${delimiterCodeList.join(",")}}
           }
         }
       </script>
       <style lang='scss'>
         ${Array.from(styleCodeList, m => m.content).join("\n")}
       </style>`;
};
