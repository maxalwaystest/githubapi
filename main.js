function getResponse(url) {
	let request = new XMLHttpRequest();
	request.open('get', url, false)
	request.send();
	let data = JSON.parse(request.responseText);
	return data;
}

let dataUser = getResponse('https://api.github.com/users/maxalwaystest/repos');
let dataCommits = getResponse('https://api.github.com/repos/maxalwaystest/githubapi/commits');

let repo = document.getElementById('repo');
let msg = document.getElementById('msg');

repo.innerHTML = "Repository:  " + dataUser[0].name + " ==== Description:  " + dataUser[0].description;

var needMerge = function() {
	for(let i=0; i<dataCommits.length; i++) {
		var dataComments = (getResponse(dataCommits[i].comments_url));
		if(dataComments.length == 0) {
			return "You need add own comment on commit:__ " + dataCommits[i].commit.message;
		}
		//console.log(dataComments[0].user);
		//console.log(dataUser[0].owner);
		let index = 0;
		for(let i=0; i<dataComments.length; i++) {
			if(dataComments[i].user.login == dataUser[0].owner.login) {
				index++;
			}
			if(index == 0) {
				return "you need add comment"
			}
		}		
	}
	return "Yoo can merge it"
}
//console.log(needMerge());
msg.innerHTML = needMerge();


