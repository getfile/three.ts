
	var node = document.getElementsByTagName( 'body' )[ 0 ];

	console.log( '----------------------------' );
	console.log( node.baseURI );
	console.log( "parent: ", node.parentNode );
	console.log( "childs num: ", node.childNodes.length );
	console.log( "first child: ", node.firstChild );
	console.log( "last child: ", node.lastChild );
	console.log( "next sibling: ", node.nextSibling );
	console.log( "prev sibling: ", node.previousSibling );
	console.log( "nodeName: ", node.nodeName );
	console.log( "nodyType: ", node.nodeType );
	console.log( "nodeValue: ", node.nodeValue );
	console.log( "owner document: ", node.ownerDocument );
	console.log( "parent element: ", node.parentElement );
	console.log( "text context: ", node.textContent );
