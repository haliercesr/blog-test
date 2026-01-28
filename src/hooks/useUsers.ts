import { useState, useEffect, useCallback } from 'react';
import { usersApi } from '../api';
import { IUser } from '../interfaces';
import { useUIContext } from '../context';

export const useUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { showLoader, hideLoader } = useUIContext();

  const fetchUsers = useCallback(async (pageNum: number = 0, reset: boolean = false) => {
    if (isLoading) return;
    
    setIsLoading(true);
    showLoader('Cargando usuarios...');
    
    try {
      const response = await usersApi.getUsers(pageNum, 20);
      
      if (reset) {
        setUsers(response.data);
      } else {
        setUsers((prev) => [...prev, ...response.data]);
      }
      
      setTotal(response.total);
      setHasMore(response.data.length > 0 && (pageNum + 1) * 20 < response.total);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
      hideLoader();
    }
  }, [isLoading, showLoader, hideLoader]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      fetchUsers(page + 1);
    }
  }, [hasMore, isLoading, page, fetchUsers]);

  const refresh = useCallback(() => {
    setUsers([]);
    setPage(0);
    setHasMore(true);
    fetchUsers(0, true);
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers(0, true);
  }, []);

  return {
    users,
    isLoading,
    hasMore,
    total,
    loadMore,
    refresh,
  };
};
