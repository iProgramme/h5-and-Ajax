/*
 * �������ƶ���click����300ms���ҵ���ʱ
 * Ϊ����Ӧ�ٶȸ��� �ƶ���һ����װһ����tap���¼�,��������touch�¼����Ż�click
 * click�¼����ص㣺 �û���ָ�Ӵ���Ļ��Ȼ���뿪����ָ�����ƶ���������ָ�Ӵ���Ļ��ʱ��ܶ�
 * touchģ�⣺ touch������û�д���touchemove�¼� ����ָ�Ӵ���Ļ��ʱ��ܶ�
 *
 * ����һ��tap�������Ż�click�¼�
 */

/*1��������ȫ�ֵı����ͷ��� �����ײ���ȫ����Ⱦ����*/
/*���������ʹ�������ռ�*/

/*2��tap�¼� ���ڸ�һ�����Ӱ��Ż���ĵ���¼�*/

var itcast={
    /*
    * obj:Ҫ���¼�����
    * callback������¼�������Ļص�����
    * */
    tap:function(obj,callback){
      if(typeof obj=='object'){
          var startTime=0; //��¼��ʼʱ��
          var isMove=false; //��¼�Ƿ��ƶ�

          obj.addEventListener('touchstart',function(){
              startTime=Date.now();//��¼��ʼʱ��
          });

          obj.addEventListener('touchmove',function(){
              isMove=true;//��¼��ָ�ƶ�
          });

          obj.addEventListener('touchend',function(e){
              //�ж��Ƿ�Ϊclick�¼�
              if(Date.now()-startTime<150&&!isMove){
                  callback&&callback(e); //ִ�лص�����
              }

              //��������
              startTime=0;
              isMove=false;
          });

      }

    }
};







