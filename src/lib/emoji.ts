import twemoji from 'twemoji';
const emoji = require('node-emoji');


const twemojiParse = (content: string): string =>
        twemoji.parse(content, {
                ext: `.svg`,
                size: 'svg' ,
        }) as any

export const emojiExtension = {
        name: 'emoji',
        level: 'inline',                         
        start(src: any) { return src.indexOf(':'); },
        tokenizer(src: any, _: any[]) {
                const rule = /^:(\w+):/;               
                const match = rule.exec(src);
                if (match) {
                        return {                            
                                type: 'emoji',                   
                                raw: match[0],                  
                                emoji: match[1]                
                        };
                }
                return
        },
        renderer(token: any): any {
                return `<span className="emoji">${twemojiParse(emoji.emojify(token.raw))}</span>`;
        },
};
