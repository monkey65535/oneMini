/*
 *  爬虫,抓取One的首页数据,并存储到数据库的one_home表重
 *
 */

const cheerio = require('cheerio')
const superagent = require('superagent')
const schedule = require('node-schedule')
// 引入模型存储数据
const {OneHome} = require('../models/OneHome')
const {OneArtical} = require('../models/OneArtical')
const {OneQues} = require('../models/OneQuestions')

class ArgentOneData {
    constructor() {
        this.URL = 'http://wufazhuce.com/'
    }

    // init函数
    async initNet() {
        await schedule.scheduleJob('00 00 14 * * *', async () => {
            await this.cherroOneForURL();
            await this.cherroOneArticl();
            await this.cherroOneQuestions();
            await this.cherroOneSwiper();
            console.log(`执行了定时任务 ${new Date()}`);
        });
    }

    /*
     *  获取首页数据,并存储
     */
    async cherroOneForURL() {
        try {
            const oneHomeRes = await superagent.get(this.URL)
            this.$ = cheerio.load(oneHomeRes.text);
            // 将html作为参数加入到 cheerio 并输出数据,然后实现模型,添加到数据库中
        } catch (e) {
            console.log(e);
        }
    }

    // 解析获取文章数据
    cherroOneArticl() {
        const articleList = [];
        // 获取今天的文章
        const articalEle = this.$('.fp-one-articulo')
        const todayArtical = {
            vol_num: articalEle.find('.one-titulo').text().split('.')[1].trim(),
            title: articalEle.find('.one-articulo-titulo > a').text().split('-')[0].trim(),
            author: articalEle.find('.one-articulo-titulo > a > small').text().split('-')[1].trim(),
            href: articalEle.find('.one-articulo-titulo > a').attr('href').trim()
        }
        articleList.push(todayArtical);
        // 获取前6篇文章
        articalEle.find('.list-unstyled.pasado li').each((index, ele) => {
            articleList.push({
                vol_num: this.$(ele).find('.text-muted').text().split('.')[1].trim(),
                title: this.$(ele).find('a').text().split('-')[0].trim(),
                author: this.$(ele).find('a > small').text().split('-')[1].trim(),
                href: this.$(ele).find('a').attr('href').trim()
            });
        })

        // 数据生成完毕
        OneArtical.insertArrsHome(articleList)
    }

    // 解析获取问答数据
    cherroOneQuestions() {
        const quesEle = this.$('.fp-one-cuestion')
        const quesList = [];
        const todayQuse = {
            vol_num: quesEle.find('.one-titulo').text().split('.')[1].trim(),
            title: quesEle.find('.one-cuestion-titulo  a').text().trim(),
            href: quesEle.find('.one-cuestion-titulo  a').attr('href').trim()
        }
        quesList.push(todayQuse);
        quesEle.find('.list-unstyled.pasado li').each((index, ele) => {
            quesList.push({
                vol_num: this.$(ele).find('.text-muted').text().split('.')[1].trim(),
                title: this.$(ele).find('a').text().split('-')[0].trim(),
                href: this.$(ele).find('a').attr('href').trim()
            });
        })

        // 数据生成完毕
        OneQues.insertArrsHome(quesList);
    }

    // 解析获取首页数据
    cherroOneSwiper() {
        const swiperList = this.$('#carousel-one')
        let swiperDatas = []
        swiperList.find('.carousel-inner .item').each((index, ele) => {
            swiperDatas.push({
                imgUrl: this.$(ele).find('.fp-one-imagen').attr('src').trim(),
                type: this.$(ele).find('.fp-one-imagen-footer').text().trim(),
                sentence: this.$(ele).find('.fp-one-cita a').text().trim(),
                vol_num: this.$(ele).find('.titulo').text().split('.')[1].trim(),
                day: this.$(ele).find('.dom').text().trim(),
                may: this.$(ele).find('.may').text().trim()
            })
        })
        OneHome.insertArrsHome(swiperDatas);
    }
}


module.exports = {
    ArgentOneData
}
