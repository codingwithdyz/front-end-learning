const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true) //读取URL中的api 

request.onload = function () {
  var data = JSON.parse(this.response)  //解析成JSON文件并存在data中 
  if (request.status >= 200 && request.status < 400) {
    data.forEach((movie) => {
      //创建一个class = card 的div标签
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      //创建一个h1标签，把内容设置为movie的标题
      const h1 = document.createElement('h1')
      h1.textContent = movie.title

      //创建一个p标签，把内容设置为movie的描述
      const p = document.createElement('p')
      movie.description = movie.description.substring(0, 300) //限制字符长度为300
      p.textContent = `${movie.description}...` //以省略号结束

      container.appendChild(card)

      card.appendChild(h1)
      card.appendChild(p)
    })
  } else {
    const errorMessage = document.createElement('marquee') //创建一个跑马灯类型的标签
    errorMessage.textContent = `Oppos, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()
