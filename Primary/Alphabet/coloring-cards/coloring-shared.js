/** Lesson 02 涂色卡片 HTML 构建 */
(function (global) {
    const ALPHABET_COS = 'https://s-class-1403296481.cos.ap-chengdu.myqcloud.com/s-class/Primary/Alphabet/';
    function imgSrc(word, prefix) {
        if (/^https?:\/\//i.test(word.img)) return word.img;
        const p = prefix || '';
        if (p) return p + word.img.replace(/^assets\//, '../assets/');
        return ALPHABET_COS + word.img;
    }

    function buildSheet(entry, imgPrefix) {
        const letter = entry.letter;
        const sm = letter.toLowerCase();
        const hue = entry.hue;
        const w1 = entry.words[0];
        const w2 = entry.words[1];
        const low1 = w1.word.toLowerCase();
        const low2 = w2.word.toLowerCase();

        return `
        <div class="coloring-sheet" style="--hue:${hue}" data-letter="${letter}">
            <header class="sheet-top">
                <div class="letter-trace-row" aria-label="Colour the letters">
                    <span class="trace-letter cap">${letter}</span>
                    <span class="trace-letter sm">${sm}</span>
                </div>
            </header>
            <div class="sheet-main">
                <div class="sheet-left">
                    <div class="art-box"><img src="${imgSrc(w1, imgPrefix)}" alt="${w1.word}" loading="lazy"></div>
                    <div class="art-box"><img src="${imgSrc(w2, imgPrefix)}" alt="${w2.word}" loading="lazy"></div>
                </div>
                <div class="sheet-right">
                    <div class="word-block">
                        <div class="trace-word">${low1}</div>
                        <div class="word-zh">${w1.zh}</div>
                    </div>
                    <div class="word-block">
                        <div class="trace-word">${low2}</div>
                        <div class="word-zh">${w2.zh}</div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    global.ColoringCards = { buildSheet };
})(typeof window !== 'undefined' ? window : globalThis);
