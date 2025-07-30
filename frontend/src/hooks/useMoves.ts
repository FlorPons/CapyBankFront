import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Transaction } from "../types/Transaction.types.ts";
import { TransferCash } from "../types/CashMoves.types.ts";
import { fetchTransactions, transfer } from "../service/Moves.service.ts";

// Hook para transferencias
export const useTransfer = () => {
  const mutation = useMutation({
    mutationFn: (data: TransferCash) => transfer(data),
    onSuccess: (data) => {
      console.log("Finalizo la operación de registro");
      console.log("Datos de la operación: ", data);
    },
    onError: (error: Error) => {
      const errorMessage = error.message.split(": ").pop();
      console.error("Error en el registro:", errorMessage);
    }
  });

  return mutation;
};

// Hook para obtener transacciones simuladas

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions(); 
        setTransactions(data);
      } catch (err) {
        setError("No se pudieron cargar las transacciones.");
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, []);

  return { transactions, loading, error };
};
