/**
 * 分页组件
 */
import React from 'react';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.currentPage || 1, //damn当前页
            pageSize: props.pageSize || 20, //每页显示多少条数据
            pageBtnLength: 9 //用于控制分页的按钮个数
        };

        this.prevPage = this.prevPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.changeCurrentPage = this.changeCurrentPage.bind(this);
    }
    //上一页
    prevPage() {
        let currentPage = this.state.currentPage;
        let pageSize = this.state.pageSize;

        if(currentPage==1){
            return;
        } else {
            currentPage = currentPage-1;
            this.setState({
                currentPage:currentPage
            });
        }
        if(this.props.onChange){
            this.props.onChange(currentPage,pageSize);
        }
    }
    //下一页
    nextPage() {
        //console.log(this.state.currentPage);
        let currentPage = this.state.currentPage;
        let pageSize = this.state.pageSize;
        let totalPageNum =  Math.ceil(this.props.total/this.state.pageSize);
        console.log(totalPageNum);
        if(currentPage == totalPageNum){
            return;
        } else {
            console.log(typeof(currentPage));
            currentPage = currentPage + 1;
            console.log('lalal',currentPage);
            this.setState({
                currentPage:currentPage
            },()=>{
                console.log(this.state.currentPage);
            });
        }
        if(this.props.onChange){
            this.props.onChange(currentPage,pageSize);
        }
    }
    /**
     * [changeCurrentPage description]
     * @param  {[number]} pageNum [当前页码]
     * @return {[type]}         [description]
     */
    changeCurrentPage(pageNum) {
        this.setState({
            currentPage:pageNum
        });
        if(this.props.onChange){
            this.props.onChange(pageNum,this.state.pageSize);
        }
    }
    //处理逻辑，显示分页UI
    //this.props.total  数据的总条数
    initPageNation() {
        let renderHtml = [];
        let totalPageNum = Math.ceil(this.props.total / this.state.pageSize); //共有多少页
        //数据结构添加上一页的按钮
        renderHtml.push(
            <li key='pre' className="prev_page btn" onClick={this.prevPage}>
                <span>上一页</span>
            </li>
        );

        //总页数小于用于控制分页的按钮个数，即分页长度
        if (totalPageNum <= this.state.pageBtnLength) {
            for (let i = 1; i <= totalPageNum; i++) {
                renderHtml.push(
                    <li key={i} className={this.state.currentPage == i?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this, i)}>{i}</li>
                );
            }
        } else {

            /**
           * 这是总页数大于分页长度，分三种情况
           *    1.左边没有...
           *    2.右边没有...
           *    3.左右都有...
           */
            //第一种 左边没有。。。
            // 计算中心偏移量
            let offset = (this.state.pageBtnLength - 1) / 2;
            //if (this.state.currentPage <= offset) {
            if (this.state.currentPage <= 5) {
                // 左边没有... 显示1到8
                for (let i = 1; i <= 8; i++) {
                    renderHtml.push(
                        <li key={i}  className={this.state.currentPage == i?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this, i)}>{i}</li>
                    );
                }
                renderHtml.push(
                    <span key="rightDot" className="dot">...</span>
                );
                renderHtml.push(
                    <li key={totalPageNum}  className={this.state.currentPage == totalPageNum?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this,totalPageNum)}>{totalPageNum}</li>
                );

            } else if(this.state.currentPage > totalPageNum - 5) {
                //右边没有...
                renderHtml.push(
                    <li key="1"  className={this.state.currentPage == 1?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this,1)}>1</li>
                );
                renderHtml.push(
                    <span key="leftDot" className="dot">...</span>
                );
                for(let i = 7; i >= 1; i--){
                renderHtml.push(
                        <li key={totalPageNum - i}  className={this.state.currentPage == (totalPageNum - i)?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this,totalPageNum - i)}>{totalPageNum - i}</li>
                    );
                }
                renderHtml.push(
                    <li key={totalPageNum}  className={this.state.currentPage == totalPageNum?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this,totalPageNum)}>{totalPageNum}</li>
                );
            } else {
                /*
                    两边都有点,中间只显示7个数字
                 */
                let num = Math.floor(offset/2)+1;
                renderHtml.push(
                    <li key="1"  className={this.state.currentPage == 1?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this,1)}>1
                    </li>
                );
                renderHtml.push(
                    <span key="leftDot" className="dot">...</span>
                );
                for(let i = num; i >= 0; i--){
                    renderHtml.push(
                        <li key={this.state.currentPage - i} className={this.state.currentPage==this.state.currentPage-i?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this,this.state.currentPage - i)}>{this.state.currentPage - i}</li>
                    );
                }
                for(let j = 1 ; j <= num; j++){
                    renderHtml.push(
                        <li key={this.state.currentPage + j} className={this.state.currentPage==this.state.currentPage+j?'active pagi_item':' pagi_item'} onClick={this.changeCurrentPage.bind(this,this.state.currentPage +j)}>{this.state.currentPage +j}</li>
                    );
                }
                renderHtml.push(
                    <span key="rightDot" className="dot">...</span>
                );
                renderHtml.push(
                    <li key={totalPageNum}  className={this.state.currentPage == totalPageNum?'active pagi_item':'pagi_item'} onClick={this.changeCurrentPage.bind(this,totalPageNum)}>{totalPageNum}</li>
                );
            }

        }
        renderHtml.push(
            <li key='next' className="btn next_page" onClick={this.nextPage}>
                <span>下一页</span>
            </li>
        );
        return renderHtml;
    }

    render() {
        return (
            <ul className="pagination">
                {this.initPageNation()}
            </ul>
        );
    }
}

export default Pagination;
