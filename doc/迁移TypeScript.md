# 迁移Typescript

最初创建项目的时候并没有选择TypeScript模板，如果一开始就选择TypeScript模板，不需要这些步骤。


```sh
yarn add --dev typescript
# 依据你按照的react版本
yarn add --dev @types/react@16.8.3
# 这个没有0.59对应版本的
yarn add --dev @types/react-native@0.57.65
```

项目根目录创建`tsconfig.json`文件

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "jsx": "react",
    "lib": ["es6"],
    "moduleResolution": "node",
    "noEmit": true,
    "strict": true,
    "target": "esnext"
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

创建`jest.config.js` 配置jest使用typescript

```js
module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
```

项目中现有js文件后缀修改文`tsx`

```
App.js => App.tsx
```