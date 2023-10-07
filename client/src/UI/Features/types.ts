
export interface IFeature{
    Icon: any;
    title: string;
    description: string;
}

export interface FeaturesProps {
    features: IFeature[],
    secondary?: boolean
};