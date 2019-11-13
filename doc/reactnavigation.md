# React Navigation

下面的库是特定版本，为了支持RN0.59 无AndroidX

## 安装

4.0 版本

```
yarn add react-navigation
```

官网文档说4.0版本会自动安装`react-native-gesture-handler`,`react-native-reanimated`以及`react-native-screens`。但是yarn add 的时候有提示

```
warning "react-navigation > @react-navigation/native@3.6.2" has unmet peer dependency "react-native-gesture-handler@*"
```

导致 `react-native-gesture-handler` `react-native-reanimated`没有安装，需要手动安装

### gesture-handler

```sh
# 兼容RN 0.59 不使用AndroidX
yarn add react-native-gesture-handler@1.2.0
react-native link react-native-gesture-handler
```

MainActivity.java

需要修改

```diff
package com.swmansion.gesturehandler.react.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```


react-native-reanimated安装

```sh
yarn add react-native-reanimated@^1.2.0
react-native link react-native-reanimated
```

react-native-screens暂时不安装，因为没有使用到这个功能


用到导航方式 stack、tab。现在需要单独按照这两个库

```sh
yarn add react-navigation-stack
yarn add react-navigation-tabs
```

