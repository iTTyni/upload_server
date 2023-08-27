import {FileUpload} from '../scalars';
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import {GraphQLClient} from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} & {[P in K]-?: NonNullable<T[P]>};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  FileUpload: FileUpload;
};

/** ファイルアップロードリクエスト */
export type FileUploadRequest = {
  file: Scalars['FileUpload'];
};

/** ファイルアップロードレスポンス */
export type FileUploadResponse = {
  __typename?: 'FileUploadResponse';
  path: Scalars['String'];
};

/** ヘルスチェック */
export type HealthCheckRequest = {
  _?: InputMaybe<Scalars['Boolean']>;
};

/** ヘルスチェック */
export type HealthCheckResponse = {
  __typename?: 'HealthCheckResponse';
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** ファイルアップロード */
  fileUpload?: Maybe<FileUploadResponse>;
};

export type MutationFileUploadArgs = {
  file: FileUploadRequest;
};

export type Query = {
  __typename?: 'Query';
  /** ヘルスチェック */
  healthCheck?: Maybe<HealthCheckResponse>;
};

export type QueryHealthCheckArgs = {
  input?: InputMaybe<HealthCheckRequest>;
};

export type FileUploadMutationVariables = Exact<{
  file: FileUploadRequest;
}>;

export type FileUploadMutation = {
  __typename?: 'Mutation';
  fileUpload?:
    | {__typename?: 'FileUploadResponse'; path: string}
    | null
    | undefined;
};

export type HealthCheckQueryVariables = Exact<{
  request?: InputMaybe<HealthCheckRequest>;
}>;

export type HealthCheckQuery = {
  __typename?: 'Query';
  healthCheck?:
    | {__typename?: 'HealthCheckResponse'; success?: boolean | null | undefined}
    | null
    | undefined;
};

export const FileUploadDocument = gql`
  mutation fileUpload($file: FileUploadRequest!) {
    fileUpload(file: $file) {
      path
    }
  }
`;
export const HealthCheckDocument = gql`
  query healthCheck($request: HealthCheckRequest) {
    healthCheck(input: $request) {
      success
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    fileUpload(
      variables: FileUploadMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<FileUploadMutation> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<FileUploadMutation>(FileUploadDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'fileUpload'
      );
    },
    healthCheck(
      variables?: HealthCheckQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<HealthCheckQuery> {
      return withWrapper(
        wrappedRequestHeaders =>
          client.request<HealthCheckQuery>(HealthCheckDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'healthCheck'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  FileUpload: ResolverTypeWrapper<Scalars['FileUpload']>;
  FileUploadRequest: FileUploadRequest;
  FileUploadResponse: ResolverTypeWrapper<FileUploadResponse>;
  HealthCheckRequest: HealthCheckRequest;
  HealthCheckResponse: ResolverTypeWrapper<HealthCheckResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  FileUpload: Scalars['FileUpload'];
  FileUploadRequest: FileUploadRequest;
  FileUploadResponse: FileUploadResponse;
  HealthCheckRequest: HealthCheckRequest;
  HealthCheckResponse: HealthCheckResponse;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
}>;

export interface FileUploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['FileUpload'], any> {
  name: 'FileUpload';
}

export type FileUploadResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['FileUploadResponse'] = ResolversParentTypes['FileUploadResponse']
> = ResolversObject<{
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HealthCheckResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['HealthCheckResponse'] = ResolversParentTypes['HealthCheckResponse']
> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  fileUpload?: Resolver<
    Maybe<ResolversTypes['FileUploadResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationFileUploadArgs, 'file'>
  >;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  healthCheck?: Resolver<
    Maybe<ResolversTypes['HealthCheckResponse']>,
    ParentType,
    ContextType,
    RequireFields<QueryHealthCheckArgs, never>
  >;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  FileUpload?: GraphQLScalarType;
  FileUploadResponse?: FileUploadResponseResolvers<ContextType>;
  HealthCheckResponse?: HealthCheckResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

// typeDefs

export const typeDefs = gql`
  scalar FileUpload

  """
  ファイルアップロードリクエスト
  """
  input FileUploadRequest {
    file: FileUpload!
  }

  """
  ファイルアップロードレスポンス
  """
  type FileUploadResponse {
    path: String!
  }

  """
  ヘルスチェック
  """
  input HealthCheckRequest {
    _: Boolean
  }

  """
  ヘルスチェック
  """
  type HealthCheckResponse {
    success: Boolean
  }

  type Mutation {
    """
    ファイルアップロード
    """
    fileUpload(file: FileUploadRequest!): FileUploadResponse
  }

  type Query {
    """
    ヘルスチェック
    """
    healthCheck(input: HealthCheckRequest): HealthCheckResponse
  }
`;
