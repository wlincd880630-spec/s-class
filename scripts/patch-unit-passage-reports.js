/**
 * 批量为 PET/Unit*_passage/*.html 注入：evaluate() 后 SClass.log 朗读/翻译；visibility 报告带 page_label
 * 运行: node scripts/patch-unit-passage-reports.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'PET');
const passageDirs = fs.readdirSync(root).filter(d => d.startsWith('Unit') && d.endsWith('_passage'));

const EVAL_INSERT = `this.evaluation = (data && data.content) ? data.content : (data.error || "评价服务连接失败");
                        if (window.SClass && this.evaluation) {
                            var ref = "P" + (this.currentPassageIdx + 1) + " S" + (this.currentSentenceIdx + 1);
                            window.SClass.log("朗读/翻译", ref, (data && data.content) ? "done" : "error", String(this.evaluation).slice(0, 400));
                        }`;

const OLD_EVAL_END = `this.evaluation = (data && data.content) ? data.content : (data.error || "评价服务连接失败");
                    } catch (e) { this.evaluation = "评价服务连接失败"; } finally { this.isEvaluating = false; }`;

const NEW_EVAL_END = `this.evaluation = (data && data.content) ? data.content : (data.error || "评价服务连接失败");
                        if (window.SClass && this.evaluation) {
                            var ref = "P" + (this.currentPassageIdx + 1) + " S" + (this.currentSentenceIdx + 1);
                            window.SClass.log("朗读/翻译", ref, (data && data.content) ? "done" : "error", String(this.evaluation).slice(0, 400));
                        }
                    } catch (e) { this.evaluation = "评价服务连接失败"; } finally { this.isEvaluating = false; }`;

const OLD_VISIBILITY = `_sc_sent = true;
      SClass.sendReport({ contentName: document.title.split("|")[0].trim() });`;
const NEW_VISIBILITY = `_sc_sent = true;
      var unitNum = (location.pathname.match(/Unit(\\d+)_passage/) || [])[1] || "";
      SClass.sendReport({ contentName: document.title.split("|")[0].trim(), page_label: unitNum ? ("PET Unit " + unitNum + " Passage") : document.title.split("|")[0].trim() });`;

let patched = 0;
for (const dir of passageDirs) {
  const htmlPath = path.join(root, dir, dir + '.html');
  if (!fs.existsSync(htmlPath)) continue;
  let content = fs.readFileSync(htmlPath, 'utf8');
  let changed = false;
  if (content.includes('SClass.sendReport({ contentName:') && !content.includes('page_label: unitNum')) {
    content = content.replace(OLD_VISIBILITY, NEW_VISIBILITY);
    changed = true;
  }
  if (content.includes('this.evaluation = (data && data.content)') && !content.includes('SClass.log("朗读/翻译"')) {
    content = content.replace(OLD_EVAL_END, NEW_EVAL_END);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(htmlPath, content, 'utf8');
    console.log('Patched:', dir);
    patched++;
  }
}
console.log('Done. Patched', patched, 'passage files.');
