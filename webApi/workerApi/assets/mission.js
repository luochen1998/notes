console.log('我是worker');
export const a = 1
self.onmessage = (e) => {
    console.log('我收到了外部来的值' + e.data);
    self.postMessage(e.data ** 10)
    self.terminate()  //立即终止worker行为
}