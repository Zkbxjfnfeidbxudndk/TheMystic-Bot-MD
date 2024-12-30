import yts from 'yt-search'

import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'

let limit = 320

let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {

  

    if (!text) throw `✳️ Ingresa el título de una canción\n\n📌Ejemplo *${usedPrefix + command}* Lil Peep hate my life`

  let chat = global.db.data.chats[m.chat]

  let res = await yts(text)

  //let vid = res.all.find(video => video.seconds < 3600)

  let vid = res.videos[0]

  if (!vid) throw `✳️ Vídeo/Audio no encontrado`

  let isVideo = /vid$/.test(command)

  m.react('🎧') 

  

  try {

  let q = isVideo ? '360p' : '128kbps' 

  let v = vid.url

  let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))

  let dl_url = await (isVideo ? yt.video[q].download() : yt.audio[q].download())

  let title = await yt.title

  let size = await (isVideo ? yt.video[q].fileSizeH : yt.audio[q].fileSizeH)

  let play = `

	≡ *FG MUSIC*

┌──────────────

▢ 📌 *Título* : ${vid.title}

▢ 📆 *Publicado:* ${vid.ago}

▢ ⌚ *Duración:* ${vid.timestamp}

▢ 👀 *Vistas:* ${vid.views}

└──────────────



_Enviando..._`

conn.sendFile(m.chat, vid.thumbnail, 'play', play, m, null, rpig)



if (size.split('MB')[0] >= limit) return m.reply(` ≡  *FG YTDL*\n\n▢ *⚖️Peso* : ${size}\n▢ *🎞️Calidad* : ${q}\n\n▢ _El archivo supera el límite de descarga_ *+${limit} MB*`) 

if (size.includes('GB')) return m.reply(` ≡  *FG YTDL*\n\n▢ *⚖️Peso* : ${size}\n▢ *🎞️Calidad* : ${q}\n\n▢ _El archivo supera el límite de descarga_ *+${limit} MB*`)   

	  conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), `

 ≡  *FG YTDL*

  

▢ *📌Título* : ${title}

▢ *🎞️Calidad* : ${q}

▢ *⚖️Peso* : ${size}

`.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })

		m.react(done) 

    } catch {

		m.reply(`Error: intenta de nuevo`)

    }



}

handler.help = ['play']

handler.tags = ['dl']

handler.command = ['play', 'playvid']



export default handler
