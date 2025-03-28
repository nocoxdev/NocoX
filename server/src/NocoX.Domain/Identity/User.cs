using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using Volo.Abp;
using Volo.Abp.Domain.Entities.Auditing;

namespace NocoX.Identity;

public class User : FullAuditedEntity<Guid>
{
    public User(
        Guid id,
        [NotNull] string userName,
        [NotNull] string email,
        [NotNull] string password,
        string? phoneNumber
    )
    {
        Check.NotNull(userName, nameof(userName));
        Check.NotNull(email, nameof(email));
        Check.NotNull(password, nameof(password));

        Id = id;
        UserName = userName;
        Email = email;
        PhoneNumber = phoneNumber;
        Password = password;
        EmailConfirmed = false;
        PhoneNumberConfirmed = false;
        Description = string.Empty;
    }

    /// <summary>
    /// get or set userName
    /// </summary>
    public string UserName { get; set; }

    /// <summary>
    /// get or set email
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// get or set phone number
    /// </summary>
    public string? PhoneNumber { get; set; }

    /// <summary>
    /// get or set avatar
    /// </summary>
    public string? Avatar { get; set; }

    /// <summary>
    /// get or set password hash
    /// </summary>
    public string Password { get; set; }

    /// <summary>
    /// get or set is active
    /// </summary>
    public UserStatus Status { get; set; }

    public string? Description { get; set; }

    /// <summary>
    /// get or set email confirmed
    /// </summary>
    public bool EmailConfirmed { get; set; }

    /// <summary>
    /// get or set phone number confirmed
    /// </summary>
    public bool PhoneNumberConfirmed { get; set; }

    /// <summary>
    /// Gets or sets the last password change time for the user.
    /// </summary>
    public DateTime? LastPasswordChangeTime { get; set; }

    /// <summary>
    /// set user name
    /// </summary>
    /// <param name="userName"></param>
    public void SetUserName(string userName)
    {
        UserName = userName;
    }

    /// <summary>
    /// set email
    /// </summary>
    /// <param name="email"></param>
    public void SetEmail(string email)
    {
        Email = email;
    }

    /// <summary>
    /// set phone number
    /// </summary>
    /// <param name="phoneNumber"></param>
    public void SetPhoneNumber(string phoneNumber)
    {
        PhoneNumber = phoneNumber;
    }

    /// <summary>
    /// set avatar
    /// </summary>
    /// <param name="avatar"></param>
    public void SetAvatar(string avatar)
    {
        Avatar = avatar;
    }

    public void SetDescription(string description)
    {
        Description = description;
    }

    /// <summary>
    /// set email confirmed
    /// </summary>
    /// <param userName="confirmed"></param>
    public void SetPhoneNumberConfirmed(bool confirmed)
    {
        PhoneNumberConfirmed = confirmed;
    }

    /// <summary>
    /// set email confirmed
    /// </summary>
    /// <param userName="confirmed"></param>
    public void SetEmailConfirmed(bool confirmed)
    {
        EmailConfirmed = confirmed;
    }

    /// <summary>
    /// set new password
    /// </summary>
    /// <param userName="newPassword"></param>
    public void SetNewPassword(string newPassword)
    {
        Password = newPassword;
    }

    /// <summary>
    /// set last password change time
    /// </summary>
    /// <param userName="lastPasswordChangeTime"></param>
    public void SetLastPasswordChangeTime(DateTime? lastPasswordChangeTime)
    {
        LastPasswordChangeTime = lastPasswordChangeTime;
    }

}
