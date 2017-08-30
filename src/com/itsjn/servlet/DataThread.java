package com.itsjn.servlet;

class DataThread extends Thread {  
	public static long str;
    public void run() {  
        while (!this.isInterrupted()) {// 线程未中断执行循环  
            try {  
                Thread.sleep(2000);  
            } catch (InterruptedException e) {  
                e.printStackTrace();  
            }  
              
            // ------------------ 开始执行 ---------------------------  
            //System.out.println("____FUCK TIME:" + System.currentTimeMillis());
            str=System.currentTimeMillis();
        }  
    }  
} 