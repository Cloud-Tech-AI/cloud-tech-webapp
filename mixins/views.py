from community.models import Community


class GetTenantsMixin:
    def get_tenants(self):
        return Community.objects.all()
