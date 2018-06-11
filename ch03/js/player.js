//���岥�Ŷ���
var Player = {
  //��Ҫ������audio����
  audioObj:null, 
  //��ǰ���Ÿ�����������
  currentId:-1,
  //�����ļ�����
  playList:[],
  //��ʼ��player���󣬴���audio���󣬰��¼�
  init:function()
  {
	 //����audio����
	 var aObj = $("<audio id='ai'></audio>");
	 this.audioObj = aObj[0];	     
  },	 
  //��ղ����б�
  clearList:function(){
	this.playList.length = 0;
	this.currentId = -1;
  },
  //��������
  add:function(name,url)
  {
	this.playList.push({"name":name,"url":url});
  },
  //ɾ������
  remove:function(name)
  {
	delete this.playList[name];
  },
  //��������������
  play:function(index)
  {
	 var song = null;
	 if((song=this.playList[index])!=null)
	   {		
		 //�����ǰ���ֿ��Բ��Ų��Һ���Ҫ���ŵ�һ�£���������ţ��������¼�������
		 if(this.audioObj.readyState==4&&this.currentId==index)
		 {
			 this.audioObj.play();
		 }
		 else
		 {
			 this.currentId = index;
			 //��ֹͣ����
			 this.stop();
			 //���¼���
			 this.audioObj.src= song.url;
			 //�󶨼��������ݺ󲥷�
			 $(this.audioObj).bind("canplaythrough",function(){  			
				this.play();
			 })
		 }
	   }
	 return song;
  },
  //ֹͣ����
  stop:function()
  {
	this.audioObj.pause();
  },	 
  //�����б��Ƿ�Ϊ��
  isEmptyPlayList:function()
  {
	return this.playList.length == 0;
  },
  //step:1 ������һ�� step:-1 ������һ��
  playStep:function(step)
  {
	if(this.isEmptyPlayList())
	{
	  return null;
	}
	//�����ǰ����idΪ�գ��򲥷ŵ�һ�� 
	if(this.currentId == null)
	{
	   return this.play(this.playList[0]);
	}
	else
	{
	   var id = this.currentId;
	   //1��ʾǰ��һ��
	   if(step==1)
		 {
		   id = (id<this.playList.length-1)?id+1:0;
		 }
	   else if(step==-1) //-1��ʾ����һ��
		 {
		   id = (id>0)?id-1:this.playList.length-1;
		 }		     
	   return this.play(id);
	}
  },
  //������һ��
  playNext:function()
  {
	return this.playStep(1);
  },
  //����ǰһ��
  playPri:function()
  {
	return this.playStep(-1);
  }
};