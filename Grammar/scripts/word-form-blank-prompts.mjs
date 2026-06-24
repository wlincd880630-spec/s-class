/**
 * 2018–2026 B 卷每空 · 语篇关联苏格拉底引导问（逐空定制，禁止套话）
 */

import { MANUAL } from "./word-form-blank-prompts-manual.mjs";

function extractCtx(passage, slot) {
  const p = String(passage || "").replace(/\r\n/g, " ");
  const token = `__${slot}__`;
  const i = p.indexOf(token);
  if (i < 0) return { before: "", after: "" };
  return {
    before: p.slice(Math.max(0, i - 72), i).trim(),
    after: p.slice(i + token.length, i + token.length + 72).trim(),
  };
}

function catPrompts(blank, ctx, bank) {
  const b = blank.base;
  const after = ctx.after.split(/\s+/).slice(0, 6).join(" ");
  const beforeTail = ctx.before.split(/\s+/).slice(-8).join(" ");

  switch (blank.cat) {
    case "adj-derive":
      return [
        `紧挨空格之后是「${after || "名词"}」——空格应修饰该名词，需要什么词性？`,
        `前文「${beforeTail}」提示空格在名词前，形容词常由哪个词库词派生？`,
        `词库「${b}」加 -ful/-less/-y/-ed 等，哪一种符合本句语义？`,
        `变形后能否准确描述后面名词的特征？`,
        `12 词中为何选「${b}」而非其他词？`,
      ];
    case "adj-comp":
      return [
        `语境「${beforeTail}【空】${after}」是否暗含比较？`,
        `空格处需比较级，词库「${b}」的比较级形式是什么？`,
        `后文是否有 more / than / even 等比较线索？`,
        `不规则比较级是否需单独记忆（如 more / better / less）？`,
        `代入后比较关系是否成立？`,
      ];
    case "adj-super":
      return [
        `句意是否「最…」？找最高级标志（in the world / of all 等）`,
        `前文「${beforeTail}」——good 的最高级常作什么？`,
        `词库「${b}」变为最高级后拼写是？`,
        `最高级前是否需 the？本句结构是否已有？`,
        `代入朗读是否通顺？`,
      ];
    case "adj-prefix":
      return [
        `「${beforeTail}【空】${after}」语义是否取反？`,
        `possible 加 im- 表示「不可能」，是否符合语境？`,
        `否定前缀 im-/un-/in- 如何选择？`,
        `词库「${b}」变形后意思是否与后文一致？`,
        `自检：反义是否说得通？`,
      ];
    case "adj-fixed":
      return [
        `「${beforeTail}【空】${after}」中空格修饰名词，是否用原级形容词即可？`,
        `词库「${b}」本身已是形容词，是否无需变形？`,
        `little / special / busy 等原级能否直接修饰后面名词？`,
        `本句为何不必比较级或派生？`,
        `代入原形是否语法、语义都正确？`,
      ];
    case "adv-ly":
      return [
        `「${beforeTail}【空】${after}」——空格在句首还是修饰动词/形容词？`,
        `评注整句或表方式，常由形容词 + -ly；词库哪个形容词？`,
        `词库「${b}」变副词后是否需大写、加逗号（句首时）？`,
        `y 结尾变 -ly 是否 y→i+ly？`,
        `朗读检查副词位置是否正确。`,
      ];
    case "adv-derive":
      return [
        `空格需副词修饰动词，词库「${b}」如何变为 -fully 等形式？`,
        `前文「${beforeTail}」——方式副词由 succeed 等如何派生？`,
        `successfully 等是否比单纯 -ly 更自然？`,
        `变形后是否修饰句中谓语？`,
        `代入朗读。`,
      ];
    case "adv-fixed":
    case "adv-comp":
      return [
        `「${beforeTail}【空】${after}」副词位置已固定，是否用原形或比较级？`,
        `词库「${b}」在本句作副词，应填什么形式？`,
        `比较级副词 well→better 等是否适用本句？`,
        `与前后文逻辑是否一致？`,
        `代入自检。`,
      ];
    case "noun-derive":
      return [
        `「${beforeTail}【空】${after}」——the / 形容词后常接名词`,
        `空格需名词，词库「${b}」应加 -tion/-th/-ance/-y 中哪一种？`,
        `派生名词是否与 of / the 等结构搭配？`,
        `为何不是形容词原形？`,
        `代入后名词短语是否完整？`,
      ];
    case "noun-plural":
      return [
        `「${after}」前的名词是否可数、需复数？`,
        `词库「${b}」变复数规则（-s / -ies / 不规则）？`,
        `谓语或修饰语是否提示复数？`,
        `abilities / followers 等形式是否符合？`,
        `代入检查主谓一致。`,
      ];
    case "noun-poss":
      return [
        `「${beforeTail}【空】${after}」是否表「……的」所有关系？`,
        `child 等不规则复数 + 's 所有格怎么写？`,
        `词库「${b}」的所有格形式是？`,
        `后文是否接名词？`,
        `代入朗读。`,
      ];
    case "noun-proper":
      return [
        `空格指国家/地名，形容词 British 应变为国名什么？`,
        `专有名词首字母是否大写？`,
        `in ___ 介词后接地点名词 Britain？`,
        `与后文 British people 是否呼应？`,
        `拼写检查。`,
      ];
    case "noun-gerund":
      return [
        `「${beforeTail}」后需动名词作主语/宾语？`,
        `learn → learning 是否符合动名词用法？`,
        `词库「${b}」加 -ing 后能否充当名词性成分？`,
        `与介词或特定动词搭配是否要求 -ing？`,
        `代入自检。`,
      ];
    case "noun-fixed":
      return [
        `「${beforeTail}【空】${after}」名词位置是否可直接填原形？`,
        `词库「${b}」已是名词，是否不必变形？`,
        `chance / rule / challenge 等能否直接入句？`,
        `为何本空不需要派生或复数？`,
        `代入是否通顺？`,
      ];
    case "verb-past":
      return [
        `叙述过去：「${beforeTail}【空】${after}」谓语用什么时态？`,
        `词库「${b}」变过去式/过去分词；是否不规则？`,
        `choice→chose、lead→led 等是否与时间背景一致？`,
        `单句时态是否与全段一致？`,
        `代入朗读。`,
      ];
    case "verb-passive":
      return [
        `主语承受动作：「${beforeTail}【空】${after}」是否被动？`,
        `需 be + 过去分词，touch → was touched？`,
        `词库「${b}」的过去分词形式？`,
        `by 短语或语境是否提示被动？`,
        `代入检查被动结构。`,
      ];
    case "verb-perfect":
      return [
        `has / have 后接过去分词：「${beforeTail}【空】」`,
        `词库 run → has run 表示完成时，是否符合？`,
        `时间状语是否提示现在完成？`,
        `词库「${b}」的过去分词是？`,
        `代入自检。`,
      ];
    case "verb-ing":
      return [
        `「${beforeTail}【空】${after}」——前面是介词或 start/enjoy/including？`,
        `需 -ing：词库「${b}」如何变化？`,
        `动名词还是现在分词？看句子成分。`,
        `including / flying / arguing 哪种符合？`,
        `代入朗读。`,
      ];
    case "verb-inf":
      return [
        `「${beforeTail}【空】${after}」是否 enough / want / make it + adj + 不定式？`,
        `空格需 to + 动词原形，词库哪个动词？`,
        `not to do 是否表示否定不定式？`,
        `词库「${b}」前是否加 to？`,
        `代入检查不定式结构。`,
      ];
    case "verb-base":
      return [
        `情态/使役后接原形：「${beforeTail}【空】${after}」`,
        `will / can / let 等后动词用原形？`,
        `词库「${b}」是否保持动词原形 shine/choose/keep？`,
        `主语单复数是否影响原形？`,
        `代入朗读。`,
      ];
    case "verb-prefix":
      return [
        `语义是否否定：agree → disagree？`,
        `「${beforeTail}【空】${after}」需加 dis- 等前缀？`,
        `词库「${b}」变形后意思是否与后文对立？`,
        `拼写：双写、保留词根？`,
        `代入自检。`,
      ];
    case "pron-reflex":
      return [
        `动作回到主语：「${beforeTail}【空】${after}」`,
        `they/we/it 应变为 themselves/ourselves/itself？`,
        `词库「${b}」的反身形式是？`,
        `宾语与主语是否同指？`,
        `代入朗读。`,
      ];
    case "pron-poss-adj":
      return [
        `后接名词 soldiers/features：空格需物主代词 their？`,
        `they → their 修饰名词，词库「${b}」怎么变？`,
        `能否填 them/they？为何不行？`,
        `形容词性物主代词 + 名词结构是否成立？`,
        `代入检查。`,
      ];
    case "pron-obj":
      return [
        `作宾语：「${beforeTail}【空】${after}」`,
        `they 变 them 作动词/介词宾语？`,
        `词库「${b}」的宾格是？`,
        `与主格 their/them 区分？`,
        `代入朗读。`,
      ];
    case "conj-fixed":
      return [
        `固定结构 not A but B：「${beforeTail}【空】${after}」`,
        `连接词 but 是否保持原形？`,
        `前后语义是否「不是…而是…」？`,
        `词库 but 是否已入篇？`,
        `代入朗读。`,
      ];
    case "prep-fixed":
      return [
        `介词短语：「${beforeTail}【空】${after}」`,
        `under/after 等介词是否不需变形？`,
        `词库「${b}」后直接接名词？`,
        `介词原位为何不变？`,
        `代入检查搭配。`,
      ];
    case "num-ordinal":
      return [
        `表示「第几」周年：ten → tenth？`,
        `「${beforeTail}【空】${after}」序数词修饰 anniversary？`,
        `词库「${b}」的序数形式？`,
        `序数前是否需 the？`,
        `代入朗读。`,
      ];
    default:
      return [
        `阅读上下文：「${beforeTail}【空】${after}」——第 ${blank.n} 空缺什么词性？`,
        `空格前后有哪些搭配线索（介词、连词、比较、时态）？`,
        `12 词词库中「${b}」应填原形还是变形？`,
        blank.rule ? `变形规则：${blank.rule}` : `本空类型：${blank.cat}`,
        `代入后朗读全句是否通顺？`,
      ];
  }
}

export function getBlankPrompts(year, blank, passage, bank) {
  const key = `${year}:${blank.n}`;
  if (MANUAL[key]) return MANUAL[key].slice();
  const slot = blank.slot || blank.n;
  const ctx = extractCtx(passage, slot);
  return catPrompts(blank, ctx, bank || []);
}

export default { getBlankPrompts, MANUAL };
