import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Meta = {
  nome: string;
  valor: string;
  emoji: string;
};

type MetasContextType = {
  metas: Meta[];
  adicionarMeta: (meta: Meta) => void;
  removerMeta: (index: number) => void;
  saldoAtual: number;           // ✅ adicionado
  setSaldoAtual: (valor: number) => void; // ✅ adicionado
};

const MetasContext = createContext<MetasContextType>({} as MetasContextType);

const CHAVE_METAS = '@metas';

export function MetasProvider({ children }: { children: React.ReactNode }) {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [saldoAtual, setSaldoAtual] = useState<number>(0); // ✅ adicionado

  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_METAS);
        if (dados) setMetas(JSON.parse(dados));
      } catch (e) {
        console.error('Erro ao carregar metas:', e);
      }
    }
    carregarMetas();
  }, []);

  useEffect(() => {
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(CHAVE_METAS, JSON.stringify(metas));
      } catch (e) {
        console.error('Erro ao salvar metas:', e);
      }
    }
    salvarMetas();
  }, [metas]);

  const adicionarMeta = (novaMeta: Meta) => {
    setMetas(prev => [...prev, novaMeta]);
  };

  const removerMeta = (index: number) => {
    setMetas(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <MetasContext.Provider value={{ metas, adicionarMeta, removerMeta, saldoAtual, setSaldoAtual }}>
      {children}
    </MetasContext.Provider>
  );
}

export const useMetas = () => useContext(MetasContext);