/* throttle: setTimeout() 을 통해 scroll 이벤트 제한
MDN, scroll, https://developer.mozilla.org/ko/docs/Web/API/Document/scroll_event#%EA%B0%99%EC%9D%B4_%EB%B3%B4%EA%B8%B0
dami, 20201.08.09, [React]Throttle로 Sticky Header 구현하기, https://velog.io/@dami/ReactThrottle%EB%A1%9C-Sticky-Header-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0 */

const throttle = ( callback: Function, delay: number  = 100 ) => {
    let timer : ReturnType<typeof setTimeout> | null = null;
    return () => {
        if ( !timer ){
            timer = setTimeout(()=>{
                callback();
                timer = null;
            }, delay);
        }
    };
};

export default throttle;