<template>
    <div class="top" ref="tp" @click="ret()">
        <img src="../assets/images/common/return-top.png" alt="">
    </div>
</template>

<script>
let timer = null
export default {
    data () {
        return {
            istop: true
        }
    },
    mounted () {
        this.needScroll();
    },
    methods: {
        needScroll () {
            let clientHeight = document.documentElement.clientHeight;
            let obtn = this.$refs.tp;
            window.onscroll = function () {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (osTop >= clientHeight) {
                    obtn.style.display = "block";
                }else{
                    obtn.style.display = "none";
                }
                if (!this.isTop) {
                    clearInterval(timer);
                }
                this.isTop = false;
            }
        },
        ret () {
            timer = setInterval(function () {
                let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                let ispeed = Math.floor(-osTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                this.isTop = true;
                if (osTop === 0) {
                    clearInterval(timer);
                }
            }, 30);
        }
    }
}
</script>

<style scoped>
.top{
    width: 1rem;
    height: 1rem;
    display: none;
    position: fixed;
    right: .15rem;
    bottom: 1.5rem;
    z-index: 1000;
}
.top img{
    width: 100%;
    height: 100%;
    float: left;
}
</style>
