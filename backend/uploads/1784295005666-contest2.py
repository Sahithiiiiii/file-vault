t=int(input())
for _ in range(t):
	n=int(input())
	s=input().strip()
	ok=False
	for i in range(n-1):
		if s[i]==s[i+1]:
			ok=True
			break
	if ok:
		print(1)
	else:
		print(n)
		