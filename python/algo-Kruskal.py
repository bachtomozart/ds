# coding: utf-8
import re


# WeightedGraph
class WeightedGraph:
    def __init__(self, path):
        file = open(path, "r")
        p = re.compile("\d+")
        self.vertices, self.edges = map(int, p.findall(file.readline()))
        self.graph = [[0]*self.vertices for _ in range(self.vertices)]
        for i in range(self.edges):
            u, v, weight = map(int, p.findall(file.readline()))
            self.graph[u][v] = weight
            self.graph[v][u] = weight



class UinonFind:
    def __init__(self, N):
        self._id = [i for i in range(N)]

    def connected(self, p, q):
        return self._find(p) == self._find(q)


    def union(self, p, q):
        p_root = self._find(p)
        q_root = self._find(q)
        if p_root == q_root:
            return
        self._id[p_root] = q_root


    def _find(self, p):
        while p != self._id[p]:
            p = self._id[p]
        return p





# kruskal algorithm
def kruskal(G):
 
    MST = set()
    edges = set()
    for j in range(G.vertices):
        for k in range(G.vertices):
            if G.graph[j][k] != 0 and (k, j) not in edges:
                edges.add((j, k))

    sorted_edges = sorted(edges, key=lambda e:G.graph[e[0]][e[1]])
    uf = UinonFind(G.vertices)
    for e in sorted_edges:
        u, v = e

        if uf.connected(u, v):
            continue
        uf.union(u, v)
        MST.add(e)
    return MST

if __name__ == '__main__':
    Wgraph = WeightedGraph("Graph")
    print("KRUSKAL ALGORITHM")
    MST = kruskal(Wgraph)

    for edge in MST:
        print(edge)
    print("END")