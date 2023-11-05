import React, { ReactNode } from 'react';

interface ProviderType<T> {
    Provider: React.Provider<T>;
    value: T;
}

interface ComposeProps {
    providers: ProviderType<any>[];
    children: ReactNode;
}

const ComposeContexts: React.FC<ComposeProps> = ({ providers, children }) => {
    return providers.reduceRight((acc, { Provider, value }) => {
        return <Provider value={value}>{acc}</Provider>;
    }, children);
};

function contextProvider<T>(Provider: React.Provider<T>, value: T): ProviderType<T> {
    return { Provider, value };
}

export { ComposeContexts, contextProvider };