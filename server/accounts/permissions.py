from rest_framework import permissions

# Determine if a user has Staff permissions, this isn't really
# used in our trivial example
class IsStaff(permissions.BasePermission):
    def has_permission(self, request, view):
        return view.action == 'retrieve' or request.user.is_staff
