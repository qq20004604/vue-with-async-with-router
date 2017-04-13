import Vue from 'vue'
export default new Vue({
    data(){
        return {
            user: ""
        }
    },
    methods: {
        getUser(){
            return this.user;
        }
    }
})

