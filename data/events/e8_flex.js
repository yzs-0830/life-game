/* 個人事件的彈性分流：同一件事發生在彈性高（≥ 65）與彈性低（< 30）的人身上，結果不同。
   split(事件id, 高彈性{text,fx}, 低彈性{text,fx})，會在事件原本的結果之後額外套用，並顯示在結果畫面的彈性提示中。 */
(function () {
  const split = (id, high, low) => {
    const e = LG.data.events.find(x => x.id === id);
    if (!e) throw new Error('e8: 找不到事件 ' + id);
    if (e.kind !== 'personal') throw new Error('e8: ' + id + ' 不是個人事件');
    e.flex = { high, low };
  };

  /* 童年與青少年 */
  split('ev_child_invest',
    { text: '你沒有被突然的寬裕沖昏頭，反而主動問爸媽能不能多試幾種興趣，你的世界變得更寬。', fx: { knowledge: 2, joy: 2 } },
    { text: '家裡的變化來得太快，你不太知道怎麼面對，只是默默照著原本的習慣過日子。', fx: { joy: -1 } });
  split('ev_child_sick',
    { text: '你把住院的日子當成一次難得的安靜，開始看很多平常沒時間讀的書。', fx: { knowledge: 3, joy: 2 } },
    { text: '你很怕落後，反覆焦慮，休養的時候一直不安，恢復反而更慢。', fx: { health: -2, joy: -2 } });
  split('ev_child_teacher',
    { text: '你主動問了老師很多問題，也敢嘗試完全沒做過的事，老師很高興看到你的轉變。', fx: { knowledge: 3, joy: 2, social: 1 } },
    { text: '你不太習慣老師這種不一樣的方式，一開始總想退回熟悉的做法，錯過了一些機會。', fx: { knowledge: -1, joy: -1 } });
  split('ev_teen_injury',
    { text: '你用休養的時間學了一項新的東西，康復之後，你多了一個很不一樣的興趣。', fx: { knowledge: 3, joy: 3 } },
    { text: '失去了熟悉的活動，你不知道還能做什麼，那段日子過得格外漫長。', fx: { joy: -3, social: -1 } });
  split('ev_teen_money',
    { text: '你提議用便宜的線上資源取代補習，還找同學組了讀書會，花費少了，效果沒差多少。', fx: { knowledge: 2, social: 2, wealth: 1 } },
    { text: '你覺得少了補習就完了，焦慮了好一陣子，成績也受到了影響。', fx: { knowledge: -2, joy: -2 } });
  split('ev_teen_friend',
    { text: '你很快主動認識了更多人，也和轉學的朋友保持聯繫，沒有陷入失落。', fx: { social: 3, joy: 2 } },
    { text: '少了他，你一時不知道該和誰在一起，午休總是一個人度過。', fx: { social: -2, joy: -2 } });
  split('ev_teen_viral',
    { text: '你把這份關注當成一次實驗，同時試了幾種不同的合作方式，累積了不少經驗。', fx: { social: 2, wealth: 2, flex: 1 } },
    { text: '你不知道怎麼回應，每則留言都讓你緊張，不久之後你就把帳號關掉了。', fx: { joy: -2 } });

  /* 青年與起步期 */
  split('ev_youth_mentor',
    { text: '你主動拋出了跨領域的想法，教授很感興趣，還介紹你認識了其他領域的朋友。', fx: { knowledge: 3, social: 3 } },
    { text: '你只敢回答教授問的問題，沒有多說什麼，這次機會就這樣安靜地過去了。', fx: { social: -1 } });
  split('ev_youth_chance',
    { text: '你立刻調整行程去試，還同時留了其他的選擇，結果比預期更有價值。', fx: { wealth: 2, knowledge: 2, joy: 2 } },
    { text: '你覺得這不在計畫裡，猶豫了很久，等你想通時機會已經過了。', fx: { joy: -2 } });
  split('ev_youth_family',
    { text: '你和家人好好商量，把照顧的工作分成幾個人輪流，自己的生活也沒有亂掉。', fx: { social: 2, joy: 2 } },
    { text: '你一個人把所有責任扛下來，身心都很疲憊，卻不知道可以向誰求助。', fx: { health: -3, joy: -3 } });
  split('ev_youth_scam',
    { text: '你很快冷靜下來，把證據保存好，並且和朋友一起處理，損失被降到最低。', fx: { wealth: 2, knowledge: 1 } },
    { text: '你自責了很久，甚至不敢告訴別人，這個挫折在心裡留了很長一段時間。', fx: { joy: -3, social: -2 } });
  split('ev_early_family',
    { text: '你提議把借款分階段、搭配家人其他的資源，大家都覺得這個方法可行。', fx: { social: 3, wealth: 1, joy: 2 } },
    { text: '你找不到其他辦法，只能二選一，無論哪一種都讓你在心裡過意不去。', fx: { joy: -3, social: -1 } });
  split('ev_early_accident',
    { text: '你在復健期間遠距處理了一些事務，也趁機調整了作息，康復之後反而更有精神。', fx: { health: 3, joy: 2 } },
    { text: '你被迫完全停下來，經濟與生活一起出問題，復原的路特別辛苦。', fx: { health: -3, wealth: -3 } });
  split('ev_early_boss',
    { text: '你很快找到和前輩的共同話題，還提出了一個合作的點子，兩人從此多了來往。', fx: { social: 3, knowledge: 2, wealth: 1 } },
    { text: '你有些拘謹，不知道該怎麼回應前輩的好意，這場午餐很快就結束了。', fx: { social: -1 } });
  split('ev_early_setback',
    { text: '你把這次挫折拆開來檢討，還請教不同領域的人，學到的比預期多了很多。', fx: { knowledge: 3, joy: 2 } },
    { text: '你把所有責任都歸給自己，連續幾週失眠，信心很久才恢復。', fx: { joy: -3, health: -2 } });

  /* 立業期 */
  split('ev_build_parent',
    { text: '你很快和兄弟姊妹分工，也找了專業的照護資源，沒有讓自己的生活被打散。', fx: { social: 2, health: 2, joy: 1 } },
    { text: '你一個人撐起所有照顧，生活被迫停擺，才發現自己沒有任何備案。', fx: { wealth: -3, health: -3, joy: -2 } });
  split('ev_build_headhunter',
    { text: '你不急著回答，先把幾個機會比較一遍，也藉此看清了自己真正的籌碼。', fx: { wealth: 3, joy: 2 } },
    { text: '你覺得離開太冒險，直接婉拒了，之後很久都在想：如果去了會怎麼樣。', fx: { joy: -2 } });
  split('ev_build_kid',
    { text: '你聽孩子說完，並和他一起列出幾個可行的做法，讓他自己選擇。他很驚訝你願意這樣。', fx: { social: 3, joy: 3 } },
    { text: '你只想用自己的方式來回答，談話最後不歡而散，兩人都很難受。', fx: { social: -3, joy: -3 } });
  split('ev_build_reunion',
    { text: '你和很多不同圈子的老朋友重新連上線，也因此多了新的合作與介紹。', fx: { social: 3, wealth: 1, joy: 2 } },
    { text: '你站在角落，覺得大家都過得比你好，提早離開了。', fx: { social: -2, joy: -2 } });
  split('ev_build_recognition',
    { text: '你把這份肯定轉成新的行動，開始分享自己的經驗，認識了不少新朋友。', fx: { social: 3, joy: 2 } },
    { text: '你不太習慣被注目，很快縮回原本的生活，覺得有點不真實。', fx: { joy: -1 } });

  /* 中年 */
  split('ev_mid_spouse',
    { text: '你們一起調整了生活的節奏，也找到其他的支持資源，這段日子沒有拖垮彼此。', fx: { social: 2, joy: 2, health: 1 } },
    { text: '你把所有的事都攬在身上，不知道怎麼求助，身心一起跌到谷底。', fx: { health: -3, joy: -3 } });
  split('ev_mid_friend',
    { text: '你借這個機會聯絡了很多老朋友，也開始固定安排聚會，讓關係重新熱了起來。', fx: { social: 3, joy: 2 } },
    { text: '你才發現身邊真正談得來的人所剩無幾，這種孤單比悲傷更沉重。', fx: { social: -2, joy: -3 } });
  split('ev_mid_reconnect',
    { text: '你很開心，還邀請對方加入你現在的圈子，兩個世界因此連在了一起。', fx: { social: 3, joy: 2 } },
    { text: '你不知道怎麼回覆才好，拖了幾天，這個機會就這樣沒了下文。', fx: { social: -1 } });

  /* 老年 */
  split('ev_elder_fall',
    { text: '你很快接受居家環境的調整，找了適合自己的復健方式，恢復得比預期好。', fx: { health: 3, joy: 2 } },
    { text: '你不願意改變家裡的擺設，也不想請人幫忙，很快又跌了一次。', fx: { health: -3, joy: -2 } });
  split('ev_elder_grand',
    { text: '你主動學了視訊與訊息，和年輕一輩保持聯繫，這份連結成了你每天的期待。', fx: { joy: 3, social: 2 } },
    { text: '你不太會用手機，只能等別人轉述，覺得有點遙遠。', fx: { joy: -1, social: -1 } });
  split('ev_elder_friend',
    { text: '你主動結交新朋友，加入了社區的活動，孤單被分散了不少。', fx: { social: 3, joy: 2 } },
    { text: '你覺得再也找不到像他一樣的人，把自己關在家裡好一陣子。', fx: { joy: -3, social: -2, health: -1 } });
  split('ev_elder_award',
    { text: '你把這份肯定當成新的開始，答應擔任社區志工的導師，日子更有重心。', fx: { joy: 3, social: 2 } },
    { text: '你覺得自己不值得這個獎，領完獎就匆匆離開，沒有和任何人多聊。', fx: { joy: -1 } });
})();
