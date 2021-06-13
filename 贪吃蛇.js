
var map = document.getElementById('map');
// 构造函数的方法先构造蛇
function Snake() {
  this.width = 10;
  this.height = 10;
  this.direction = 'right';
  // 将蛇分为若干节，初始为三节
  var bodyDemo = [{
    x: 2,
    y: 0
  },
  {
    x: 1,
    y: 0
  },
  {
    x: 0,
    y: 0
  }
  ];
  this.body = bodyDemo;
  this.display = function () {
    var len = this.body.length;
    for (var i = 0; i < len; i++) {
      if (this.body[i].x != null) { //由于我们后面在设置吃到食物的时候多出来的那一截默认的x的值是null，为了使多出来的这一段显示正确，这里先把它排除在外
        var s = document.createElement('div'); //给身体的每一个部分各创造一个div
        this.body[i].flag = s;
        // 设置每一节的样式
        s.style.width = this.width + 'px';
        s.style.height = this.height + 'px';
        s.style.background = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math
          .random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        s.style.borderRadius = '50%';
        // 设置每一节的位置
        s.style.position = 'absolute';
        s.style.left = this.body[i].x * this.width + 'px';
        s.style.top = this.body[i].y * this.height + 'px';
        // 将表示每一节的div ->也就是s添加到html上，使得每一节可视化
        map.appendChild(s);
      }
    }
  };
  //下面开始让蛇运动起来，通过使后一节的位置等于前一节的位置来实现
  // 蛇头根据方向来处理，这里先不写蛇头
  this.run = function () {
    // 后一节跑到前一节的位置上
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    // 现在写蛇头，根据方向来处理蛇头
    switch (this.direction) {
      case "right":
        this.body[0].x += 1;
        break;
      case "left":
        this.body[0].x -= 1;
        break;
      case "up":
        this.body[0].y -= 1;
        break;
      case "down":
        this.body[0].y += 1;
        break;
    }
    //判断蛇头的位置是否出界
    if (this.body[0].x < 0 || this.body[0].x > 79 || this.body[0].y < 0 || this.body[0].y > 39) {
      clearInterval(timer);
      alert("你居然撞死了自己！");
      // 删除旧的蛇
      for (var i = 0; i < this.body.length; i++) {
        if (this.body[i].flag != null) { // 如果刚吃完就死掉，会加一个值为null的
          map.removeChild(this.body[i].flag);
        }
      }
      this.body = bodyDemo;
      this.direction = 'right';
      this.display();
      return false; //结束
    }
    // 蛇头吃到食物，xy坐标重合
    if (this.body[0].x == food.x && this.body[0].y == food.y) {
      // 蛇加一节，根据最后一个节点定，下面会进行再一次的display会重新赋值
      this.body.push({
        x: null,
        y: null,
        flag: null
      });
      //清除食物，并重新生成食物
      map.removeChild(food.flag);
      food.display();
    }
    // 下面设置蛇尾碰到蛇头是死亡的情况,要从第五个开始判断，因为前四个永远都不可能碰到
    for (var i = 4; i < this.body.length; i++) {
      if (this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
        clearInterval(timer);
        alert("啊，你居然把自己吃掉了！！！");
        //清除旧的蛇
        for (var i = 0; i < this.body.length; i++) {
          if (this.body[i].flag != null) { // 如果刚吃完就死掉，会加一个值为null的
            map.removeChild(this.body[i].flag);
          }
        }
        this.body = bodyDemo;
        this.direction = 'right';
        this.display();
        return false;
      }
    }
    //这里执行完run函数，开始整合前边的数据，为了方便显示，我们先删除原来的蛇，重新显示一遍
    for (var i = 0; i < this.body.length; i++) {
      if (this.body[i].flag !== null) {
        map.removeChild(this.body[i].flag);
      }
    }
    //重新显示蛇
    this.display();
  }
}

//下面开始构造食物的构造函数
function Food() {
  this.width = 10;
  this.height = 10;
  this.display = function () {
    var f = document.createElement('div');
    this.flag = f;
    f.style.width = this.width + 'px';
    f.style.height = this.height + 'px';
    f.style.backgroundColor = 'red';
    f.style.borderRadius = '50%';
    f.style.position = 'absolute';
    this.x = Math.floor(Math.random() * 80);
    this.y = Math.floor(Math.random() * 40);
    f.style.left = this.x * this.width + 'px';
    f.style.top = this.y * this.height + 'px';
    map.appendChild(f);
  }
}
var snake = new Snake();
var food = new Food();
snake.display(); //初始化显示
food.display();
//加按键事件
document.body.addEventListener('keydown', onkeydown, false);

function onkeydown(event) {
  var event = event || window.event;
  switch (event.keyCode) {
    case 38:
      if (snake.direction != 'down') { // 不允许返回，向上的时候不能向下
        snake.direction = "up";
      }
      break;
    case 40:
      if (snake.direction != "up") {
        snake.direction = "down";
      }
      break;
    case 37:
      if (snake.direction != "right") {
        snake.direction = "left";
      }
      break;
    case 39:
      if (snake.direction != "left") {
        snake.direction = "right";
      }
      break;
  }
}

//点击开始时动起来
var begin = document.getElementById('begin');
var timer;
begin.addEventListener('click', onclick, false);

function onclick(event) {
  clearInterval(timer);
  timer = setInterval("snake.run()", 500);
}
