/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2025-06-23 16:34:29
 * @LastEditTime: 2025-06-24 13:55:53
 * @Description: 
 */
export interface IPrintItemOptions {
    textType:'text'|'qrcode';
    width: number;
    height: number;
    top: number;
    left: number;
    title: string;
    fontSize?:number;
    fontFamily: string;
    lineHeight?:number;
    textAlign: 'left' | 'center' | 'right';
    fontWeight?:string;
    scale:number;
}

export interface IPrintOptions{
    width:number;
    height:number;
    list:IPrintItemOptions []
}