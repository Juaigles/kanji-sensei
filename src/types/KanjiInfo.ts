export interface Kanji {
    dick: string;
    dicn: string;
    examples: [
        {
            audio: {
                mp3: string;
                acc: string;
                ogg: string;
                opus: string;
            };
            japanese: string;
            meaning: {
                english: string;
            };
        }
    ]
    grade: number;
    hint_group: number;
    ka_id: string;
    ka_utf: string;
    kanji: {
        character: string;
        kunyomi: {
            hiragana: string;
            romaji: string;
        };
        onyomi: {
            katakana: string;
            romaji: string;
        };
        meaning: {
            english: string;
        };
        strokes: {
            count: number;
            images: string[];
            timings: number[];
        };
        video: {
            mp4: string;
            webm: string;
            poster: string;
        }
    };
    kname: string;
    kstroke: number;
    kunyomi: string;
    kunyomi_ja: string;
    kunyomi_ja_search: string[];
    kunyomi_ka_display: string;
    kunyomi_search: string[];
    luminous: string;
    meaning: string;
    meaning_search: string[];
    mn_hint: string;
    onyomi: string;
    onyomi_ja: string;
    onyomi_ja_search: string[];
    onyomi_search: string[];
    rad_meaning: string;
    rad_meaning_search: string[];
    rad_name: string;
    rad_name_file: string;
    rad_name_ja: string;
    rad_name_ja_search: string[];
    rad_name_search: string[];
    rad_order: number;
    rad_position: string;
    rad_position_ja: string;
    rad_position_ja_search: string[];
    rad_position_search: string[];
    rad_stroke: number;
    rad_utf: string;
    radical: {
        animation: string[];
        character: string;
        meaning: {
            english: string;
        };
        name: {
            hiragana: string;
            romaji: string;
        };
        position: {
            hiragana: string;
            romaji: string;
            icon: string;
        }
        strokes: number
    }
    references: {
        classic_nelson: string;
        grade: number;
        kodansha: string;
    }
    stroketimes: number[];
    textbook_search: string[];
    txt_book:string[]
}