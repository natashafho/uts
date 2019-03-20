/*
	hello.js
	Menampilkan textarea pada halaman HTML
	Soal 4 UTS 2019
	
	Natasha Flaminggo
	10215032
*/

main();

function main() {
	var ta = document.createElement("textarea");
	ta.style.width = "200px";
	ta.style.height = "70px";
	ta.style.overflowY = "scroll";
	ta.value = "Hello, Natasha Flaminggo yang ber-NIM 10215032!"
	document.body.append(ta);
}