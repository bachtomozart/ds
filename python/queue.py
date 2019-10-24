class queue:
    def __init__(self):
        self.data = []
    def enqueue(self, item):
        self.data.append(item)
    def dequeue(self):
        if len(self.data) > 0:
            self.data.pop(0)
    def val(self, index):
        if 0 <= index and index < len(self.data):
            return self.data[index]
        else:
            return none
    def list(self):
        return self.data
    def size(self):
        return len(self.data)
    def clear(self):
        self.data = []

Q = queue()
Q.enqueue(10)
Q.enqueue(20)
Q.enqueue(30)
Q.enqueue(40)
Q.enqueue(50)
print(Q.list())
# [10 20 30 40 50]
print(Q.val(0))
# 10
print(Q.val(2))
# 30
Q.dequeue()
print(Q.val(2))
# 40
print(Q.size())
# 4
Q.clear()
print(Q.list())
# []
