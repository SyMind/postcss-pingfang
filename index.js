const postcss = require('postcss')

const PING_FANG_SC_MAPPINGS = {
    'PingFangSC-Ultralight': 100,
    'PingFangSC-Thin': 100,
    'PingFangSC-Light': 100,
    'PingFangSC-Regular': 400,
    'PingFangSC-Medium': 700,
    'PingFangSC-Semibold': 700
}

module.exports = (opts = {}) => {
    const { patterns } = opts

    return {
        postcssPlugin: 'postcss-pingfang',
        Once(css) {
            if (Array.isArray(patterns) && patterns.every(pattern => {
                const regExp = new RegExp(pattern)
                return !regExp.test(decl.source.input.from)
            })) {
                return
            }
        
            const additionalRules = []
        
            css.walkRules(rule => {
                let fontFamilyDecl, fontWeightDecl

                rule.walkDecls(decl => {
                    switch (decl.prop) {
                        case 'font-weight':
                            fontWeightDecl = decl
                            break
                        case 'font-family':
                            fontFamilyDecl = decl
                            break
                        default:
                            break
                    }
                })

                if (fontFamilyDecl) {
                    const fontFamilyList = fontFamilyDecl.value.split(',')
                    if (fontFamilyList.length === 1) {
                        const fontFamily = fontFamilyList[0].trim()
                        const fontWeight = PING_FANG_SC_MAPPINGS[fontFamily.trim()]
                        if (fontWeight) {
                            if (!fontWeightDecl) {
                                fontFamilyDecl.after(`font-weight: ${fontWeight}`)
                            }

                            fontFamilyDecl.remove()
                            additionalRules.push([rule.selector, fontFamily])
                        }
                    }
                    return
                }
            })
        
            if (additionalRules.length === 0) {
                return
            }
        
            const media = new postcss.AtRule({ name: 'supports', params: '(-webkit-touch-callout: none)' })
            for (const [selector, fontFamily] of additionalRules) {
                const rule = new postcss.Rule({ selector })
                const decl = new postcss.Declaration({ prop: 'font-family', value: fontFamily })
                rule.append(decl)
                media.append(rule)
            }
            css.root().append(media)
        }
    }
}

module.exports.postcss = true
