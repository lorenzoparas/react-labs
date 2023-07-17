/* eslint-disable react/jsx-key */
'use client'
import React, { useState, useEffect } from "react";
import './index.css'

const GroceryStore = () => {
    const [numItems, setNumItems] = useState(0);
    const [queues, setQueues] = useState([[], [], [], [], []]);

    useEffect(() => {
        const reduceQueueInternal = setInterval(() => {
            const newQueues = queues;
            newQueues.forEach(queue => {
                if (queue.length === 0) return queue;
                queue[0]--;
                if (queue[0] <= 0) queue.shift();
                return queue;
            });
            setQueues([...newQueues]);
        }, 500);

        return (() => {
            clearInterval(reduceQueueInternal);
        });
    }, []);

    const checkout = () => {
        if (numItems === 0) return;

        const queuePos = getOptimalQueuePos();
        const targetedQueue : number[] = queues[queuePos];

        targetedQueue.push(numItems);
        const newQueues: any = queues;
        newQueues[queuePos] = targetedQueue;

        setQueues([...newQueues]);
    };

    const getOptimalQueuePos = () => {
        let iOptimalQueue = 0;
        let optimalQueueSum = Number.MAX_VALUE;

        queues.forEach((queue, iQueue) => {
            const queueItemSum = sumQueue(queue);
            if (queueItemSum < optimalQueueSum) {
                iOptimalQueue = iQueue;
                optimalQueueSum = queueItemSum;
            }
        });

        return iOptimalQueue;
    };

    const sumQueue = (queue: number[]) => {
        let sum = 0;
        queue.forEach((currNumItems: number) => { sum += currNumItems });
        return sum;
    };
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
                <input type='number' value={numItems} onChange={e => setNumItems(parseInt(e.target.value))} />
                <button onClick={() => checkout()} style={{ marginLeft: '32px', border: '2px solid black' }}>Checkout</button>
                <div id='queue-box'>
                    {
                        queues.map(queue => {
                            return (
                                <Queue customers={ queue }/>
                            );
                        })
                    }
                </div>
            </div>
        </main>
    );
};

const Queue = ({ customers } : { customers : Number[] }) => {
    return (
        <div>
            <div className="queue"/>
            <div>
                {
                    customers.map((customer : Number) => {
                        return (
                            <div className="customer">{ customer.toString() }</div>
                        )
                    })
                }
            </div>
        </div>

    );
};

export default GroceryStore;
