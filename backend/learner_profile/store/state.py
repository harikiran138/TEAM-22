class StateStore:
    """
    Redis/Memcached State Manager interface.
    """
    def get(self, key: str):
        pass
    
    def set(self, key: str, value: Any):
        pass
