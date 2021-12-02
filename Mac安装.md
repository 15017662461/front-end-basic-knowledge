## Mac

## 设置触控板

+ 系统偏好设置 -> 触控板
+ + 光标与点按：下面三个按钮全部点亮
  + 更多手势：将所有三指操作全部改为四指
+ 系统偏好设置 -> 辅助功能
+ + 指针控制 -> 触控板选项：启用拖移 => 三指拖移



## 其他设置

+ 增强Tab键：系统偏好设置 - 键盘 - 快捷键 - 使用键盘导航在控制间移动焦点
+ 程序坞发达效果：系统偏好设置 - 程序坞 - 适当调整“大小”和“放大”并勾选放大



### 允许安装任何来源应用

打开终端 输入：

```
sudo spctl --master-disbale
```

然后输入开机密码即可

在系统偏好设置 -> 安全与隐私 中 打开左下角的锁，切换为任何来源。



## 安装Homebrew

### 使用全站之巅的国内安装

全站之巅github：https://github.com/topfullstack/mac

```
/usr/bin/ruby -e "$(curl -fsSL https://gitee.com/topfullstack/install/raw/cn/install)"

然后执行

brew update
```

### 使用中科大镜像安装

安装教程：https://brew.idayer.com/guide/start/



## 其他环境安装

### 安装其他之前必装：XCode

### node

```
brew install node
```

### yarn

```
brew install yarn
```

### VSCode

```
brew install visual-studio-code --cask
```

### Chrome

```
brew install google-chrome--cask
```

### ITerm2

```
brew install iterm2 --cask
```

### git

自行搜索git免密登录

