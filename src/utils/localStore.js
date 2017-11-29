/*
    本地存储
*/

export default {
    //获取
    getItem : (key) => {
        let value;
        try {
            value = localStorage.getItem(key);
        } catch (err) {
            console.log(err.message);
        } finally {
            return value;
        }
    },
    //设置
    setItem : (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch (err) {
            console.log(err.message);
        }
    }
};
