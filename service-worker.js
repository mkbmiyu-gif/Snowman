body{
margin:0;
padding:0;
font-family:-apple-system,BlinkMacSystemFont,sans-serif;
background:#f7f5fb;
color:#222;
}

.hidden{
display:none;
}

header{
display:none;
}

main{
padding:16px;
max-width:700px;
margin:auto;
}

.card{
background:#fff;
border-radius:24px;
padding:18px;
margin-bottom:14px;
box-shadow:0 2px 12px rgba(0,0,0,.04);
border:1px solid #f0edf8;
}

.card-top{
display:flex;
align-items:center;
gap:14px;
margin-bottom:14px;
}

.icon{
width:48px;
height:48px;
border-radius:50%;
background:#efe9fb;
display:flex;
align-items:center;
justify-content:center;
font-size:24px;
flex-shrink:0;
}

.card h2{
font-size:18px;
font-weight:700;
margin:0;
}

.card p{
font-size:13px;
margin:4px 0;
color:#666;
}

.card h3{
font-size:15px;
margin-top:18px;
margin-bottom:10px;
color:#7b61c8;
}

.history{
background:#faf9fd;
border-radius:16px;
padding:14px;
margin-bottom:10px;
border:1px solid #f0edf8;
}

.history p{
margin:3px 0;
font-size:13px;
}

.history p:first-child{
font-size:15px;
font-weight:700;
color:#6f58bb;
}

button{
width:100%;
height:44px;
border:none;
border-radius:14px;
background:#ece9f5;
color:#555;
font-size:14px;
font-weight:600;
margin-top:8px;
}

.history button{
background:#ece9f5;
color:#666;
}

button[onclick*=“deleteMeigi”]{
background:#ece9f5;
color:#666;
}

#addBtn{
background:#e8e2f7;
color:#6f58bb;
margin-top:20px;
font-weight:700;
}

.backup{
display:flex;
flex-direction:column;
gap:10px;
margin-top:24px;
}

input{
width:100%;
padding:12px 14px;
border-radius:14px;
border:1px solid #ece9f5;
background:#fff;
font-size:14px;
box-sizing:border-box;
}
