[![GitHub license](https://img.shields.io/github/license/jerosoler/cornerbox)](https://github.com/jerosoler/cornerbox/blob/main/LICENSE)

# HoudiniStampBorder
CSS Houdini library. 

![Demo](https://github.com/kimsuarez/houdini-stamp-border/raw/main/Sample.PNG)

## How to use

### HTML:
```html
<div class="stamp">
    <div>🐻</div>
    <div class="value">20c</div>
</div>

<script src="https://unpkg.com/css-paint-polyfill"></script>
<script>
    CSS.paintWorklet.addModule("https://unpkg.com/houdini-stamp-border")
</script>
```

### CSS 
```css
.stamp {
    display: grid;
    justify-content: center;
    height: 180px;
    width: 140px;
    font-size: 70px;

    padding: 14px;
    --stamp-borderRadius: 7;
    --stamp-borderColor: black;
    --stamp-cornerFactor: 1.0;
    background: paint(houdini-stamp-border);
}

.stamp .value {
    font-size: 30px;
    text-align: right;
}
```