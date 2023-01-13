const postcss = require('postcss');
const plugin = require('..');

it('postcss-font-weight', async () => {
    const result = await postcss([plugin()]).process(`
        .one {
            font-family: PingFangSC-Light;
        }
        .two {
            font-family: PingFangSC-Medium;
        }
        .three {
            font-weight: 500;
            font-family: PingFangSC-Medium;
        }
        .four {
            color: red;
        }
    `);

    expect(result.css.replace(/\s/g, '')).toEqual(`
        .one {
            font-weight: 100;
        }
        .two {
            font-weight: 700;
        }
        .three {
            font-weight: 500;
        }
        .four {
            color: red;
        }
        @supports (-webkit-touch-callout: none) {
            .one {
                font-family: PingFangSC-Light;
            }
            .two {
                font-family: PingFangSC-Medium;
            }
            .three {
                font-family: PingFangSC-Medium;
            }
        }
    `.replace(/\s/g, ''));
});