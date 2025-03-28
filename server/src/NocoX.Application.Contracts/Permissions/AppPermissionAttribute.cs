using System;

namespace NocoX.Permissions;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
public class AppPermissionAttribute : Attribute { }
