class stack:
    def __init__(self):
        self.data = []
    def push(self, item):
        self.data.append(item)
    def pop(self):
        if len(self.data) > 0:
            self.data.pop()
    def top(self):
        if len(self.data) > 0:
            return self.data[-1]
        else:
            return None
    def val(self, index):
        if 0 <= index and index < len(self.data):
            return self.data[index]
        else:
            return None
    def list(self):
        return self.data
    def size(self):
        return len(self.data)
    def clear(self):
        self.data = []

S = stack()
S.push(10)
S.push(20)
S.push(30)
S.push(40)
S.push(50)
print(S.list())
# [10 20 30 40 50]
print(S.val(1))
# 20
print(S.top())
# 50
S.pop()
print(S.top())
# 40
print(S.size())
# 4
S.clear()
print(S.list())
# []
