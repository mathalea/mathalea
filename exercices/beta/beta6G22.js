let L = 19;
let l = 12
fenetreMathalea2d = [-0,0,20,l+.1]
pixelsParCm = 30
polygone(point(0,0),point(L,0),point(L,l),point(0,l))
let B = point(4,4)
let A = pointAdistance(B,6.5,randint(100,130))
let C = pointAdistance(B,6.5,randint(60,80))
let l1 = polyline(A,B,C)
let H = point(9,4)
let G = pointAdistance(H,6.5,randint(-100,-170))
let I = pointAdistance(H,6.5,randint(-10,-80))
let l2 = polyline(G,H,I)


