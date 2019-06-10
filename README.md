# diff-date-js
A simple Javascript counter to use as you need.

#### How to use:
Copy and insert in your document, usually at the end of the body tag.
```
<script src = "./ diffDate.js"> </ script>
```

It will insert the counter into the 'innerHTML' of the object that contains the 'date-date-diff' dataSets.

#### Example:
```
<h1 date-date-diff = "2019-01-10 12:45:15"> 00:00 </ h1>
```

> If it is a past date it will start the counter for the future. Entering a progressive count. If it is a date in the future it will start a countdown and past the moment it was entered it will go to a progressive count.

### Properties:
You can use some progriedades to control see below:

| Property | Values |​ Description |
|----------|--------|-------------|
|date-date-zero|(string) 'stop'|Optional. In a countdown it tells the counter that it should stop when it reaches zero.|
|data-date-glue|(string)|Optional. When you pass a value it replaces the element that divides the seconds (Default :).|
|date-date-minus|(string)|Optional. When passed a value it replaces the element that precedes the minutes when regressive (Default -).|
|date-date-monitory|(string)|Options. When passed should be the name of a clousure function that will receive the payload return parameter. And it will run every 30 seconds.|

#### Example of a clousure function:
```
function monitory (payload) {
    console.log (payload.target, payload.detail);
};
```

### Events:
|Event|Payload|Description|
|----|---------|---------------|
|inform|{detail: difference in seconds}|Event fired every 30 seconds to help monitor the object. It sends the current time difference in seconds by the 'detail' argument.|
