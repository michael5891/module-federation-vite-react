
    export type RemoteKeys = 'remote/remote-app';
    type PackageType<T> = T extends 'remote/remote-app' ? typeof import('remote/remote-app') :any;