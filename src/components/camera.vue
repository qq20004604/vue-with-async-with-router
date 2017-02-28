<template>
    <div class="camera">
        <video width="320" height="240" autoplay></video>
        <canvas width="320" height="240"></canvas>
        <div class="camera-tips">
            <button @click="startVideo" class="btn left-btn" v-if="!canPhoto">调用摄像头</button>
            <button @click="Shoot" class="btn left-btn" v-if="canPhoto">拍照</button>
            <button @click="download" class="btn right-btn" v-if="canDownload">下载</button>
        </div>
    </div>
</template>
<style scoped>
    .camera {
        position: relative;
        border: 1px solid red;
        height: 300px;
        width: 640px;
    }

    video, canvas {
        position: absolute;
        top: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        outline: 1px solid red;
    }

    video {
        left: 0;
    }

    canvas {
        right: 0;
    }

    .camera-tips {
        position: absolute;
        top: 250px;
        left: 0;
        right: 0;
    }

    .btn {
        position: absolute;
        display: inline-block;
        outline: none;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        font: 16px/100% 'Microsoft yahei', Arial, Helvetica, sans-serif;
        padding: .5em 2em .55em;
        text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
        -webkit-border-radius: .5em;
        -moz-border-radius: .5em;
        border-radius: .5em;
        -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
        -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
        box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
        color: #d9eef7;
        border: solid 1px #0076a3;
        background: #0095cd;
        background: -webkit-gradient(linear, left top, left bottom, from(#00adee), to(#0078a5));
        background: -moz-linear-gradient(top, #00adee, #0078a5);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00adee', endColorstr='#0078a5');
    }

    .left-btn {
        left: 25%;
        transform: translateX(-50%);
    }

    .right-btn {
        left: 75%;
        transform: translateX(-50%);
    }

    .btn:hover {
        text-decoration: none;
    }

    .btn:active {
        position: relative;
        top: 1px;
    }
</style>
<script>
    export default{
        name: "a",
        data(){
            return {
                video: null,
                canvas: null,
                canPhoto: false,
                canDownload: false
            }
        },
        methods: {
            startVideo: function () {
                var self = this;
                this.video = this.$el.querySelector('video');

                // video捕获摄像头画面
                navigator.mediaDevices.getUserMedia({
//                    audio: true,    //音频
//                    video: true,
                    video: {width: 1200, height: 1200}
                }).then(success).catch(error)

                function success(stream) {
                    self.video.src = window.webkitURL.createObjectURL(stream);
                    self.video.play();
                    self.canPhoto = true;
                }

                function error(err) {
                    alert('video error: ' + err)
                }
            },
            Shoot: function () {
                var self = this;
                this.canvas = this.$el.querySelector('canvas');
                var context = this.canvas.getContext('2d');
                //把当前视频帧内容渲染到画布上
                context.drawImage(self.video, 0, 0, 320, 240);
                this.canDownload = true;
            },
            //将图片下载到本地
            download: function () {
                var dom = document.createElement("a");
                dom.href = this.canvas.toDataURL("image/png");
                dom.download = new Date().getTime() + ".png";
                dom.click();
            }
        }
    }
</script>