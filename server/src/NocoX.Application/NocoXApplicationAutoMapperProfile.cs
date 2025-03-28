using System.Collections.Generic;
using AutoMapper;
using NocoX.Account;
using NocoX.Account.Dtos;
using NocoX.AppDatas;
using NocoX.AppDatas.Dtos;
using NocoX.Apps;
using NocoX.Apps.Dtos;
using NocoX.Common.Converters;
using NocoX.Database;
using NocoX.Database.Dtos;
using NocoX.Dictionary;
using NocoX.Dictionary.Dtos;
using NocoX.Identity;
using NocoX.Identity.Dtos;
using NocoX.Permissions;
using NocoX.Permissions.Dtos;
using NocoX.Resource;
using NocoX.Resource.Dtos;
using NocoX.Templates;
using NocoX.Templates.Dtos;
using NocoX.Workspaces;
using NocoX.Workspaces.Dtos;

namespace NocoX;

public class NocoXApplicationAutoMapperProfile : Profile
{
    public NocoXApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateMap<string, Dictionary<string, object?>>()
            .ConvertUsing<StringToDictionaryConverter>();

        CreateMap<UserQueryItem, UserGetOutputDto>();
        CreateMap<UserQueryItem, UserGetProfileDto>();
        CreateMap<UserQueryItem, AppRoleGetDto>();
        CreateMap<UserQueryItem, WorkspaceMemberGetDto>();
        CreateMap<UserPermissionGrantQueryItem, UserPermissionGetDto>();
        CreateMap<User, UserGetOutputDto>();
        CreateMap<User, UserGetProfileDto>();
        CreateMap<Role, AppRoleGetDto>();
        CreateMap<Role, RoleGetDto>();
        CreateMap<RoleQueryItem, RoleGetDto>();
        CreateMap<AppPage, PageGetDto>();
        CreateMap<Block, BlockGetDto>();
        CreateMap<Workspace, WorkspaceGetDto>();
        CreateMap<LoginResultItem, LoginResultDto>();
        CreateMap<App, AppGetDto>();
        CreateMap<AppRelease, MyAppGetDto>();
        CreateMap<AppRelease, AppReleaseGetDto>();
        CreateMap<AppReleaseVersionQueryItem, AppReleaseVersionGetDto>();
        CreateMap<AppQueryItem, AppGetDto>();
        CreateMap<AppReleaseQueryItem, RunningAppGetDto>();
        CreateMap<AppPageQueryItem, PageGetDto>();
        CreateMap<AppDataRecordQueryItem, DataGetDto>();
        CreateMap<Table, TableGetDto>();
        CreateMap<TableColumn, TableColumnGetDto>();
        CreateMap<TableColumnQueryItem, TableColumnGetDto>();
        CreateMap<TableRelationQueryItem, TableColumnRelationGetDto>();
        CreateMap<ResourceDescriptorQueryItem, GetResourceDto>();
        CreateMap<ResourceDescriptor, GetResourceDto>();
        CreateMap<HistoryQueryItem, HistoryGetPageListDto>();
        CreateMap<PermissionQueryItem, PermissionGetDto>();
        CreateMap<PermissionGroupQueryItem, PermissionGroupGetDto>();
        CreateMap<DictionaryData, DictionaryDataGetDto>().ForMember(x => x.Children, opt => opt.AllowNull());
        CreateMap<DictionaryGroup, DictionaryGroupGetDto>();
    }
}
