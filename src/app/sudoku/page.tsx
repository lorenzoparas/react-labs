/* eslint-disable react/jsx-key */
'use client'
import { KeyboardEvent, createContext, useContext, useMemo, useState } from "react";
import "./index.css";

const SUDOKU_SIZE = 9;

const SelectedContext = createContext({
    selected: [],
    setSelected: (_selected: any) => {}
});

const Cell = ({ cellVal, cellNum, rowNum } : { cellVal : number, cellNum : number, rowNum : number }) => {
    const { selected, setSelected } = useContext(SelectedContext);

    const isSelected = () => selected !== null && selected[0] === rowNum && selected[1] === cellNum;

    return (
        <div
            className={`cell ${isSelected() ? 'selected' : ''}`}
            onClick={() => setSelected(isSelected() ? [] : [rowNum, cellNum])}
        >
            { cellVal || ' ' }
        </div>
    )
};

const Row = ({ row, rowNum } : { row : number[], rowNum: number }) => {
    return (
        <>
            {
                row.map((cellVal, iCell) => <Cell key={ iCell } cellVal={ cellVal } cellNum={ iCell } rowNum={ rowNum }/>)
            }
        </>  
    );
};

const Sudoku = () => {
    const [board, setBoard] = useState(Array.from({length: SUDOKU_SIZE},()=> Array.from({length: SUDOKU_SIZE}, () => null)));
    const [selected, setSelected] = useState<number[]>([]);

    const isCellSelected = () => selected.length > 0;

    const isTypedCharacterValid = (num : string) => "0".charCodeAt(0) <= num.charCodeAt(0) && num.charCodeAt(0) <= "9".charCodeAt(0);

    const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        const typedCharacter = event.key;
        if (!isTypedCharacterValid(typedCharacter) || !isCellSelected()) return;
        const newBoard: any = [...board];
        const selectedRow = selected[0];
        const selectedColumn = selected[1];
        newBoard[selectedRow][selectedColumn] = parseInt(typedCharacter);
        setSelected([]);
        setBoard(newBoard);
      };

    const contextValue : any = useMemo(() => ({
        selected,
        setSelected
      }), [selected, setSelected]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
                <SelectedContext.Provider value={contextValue}>
                    <div id="sudoku-board" tabIndex={ 0 } onKeyDown={e => onKeyDown(e)}>
                        { board.map((row : any, iRow) => <Row key={ iRow } row={ row } rowNum={ iRow } />) }
                    </div>
                </SelectedContext.Provider>
            </div>
        </main>
    );
};

export default Sudoku;
